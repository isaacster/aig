using Quartz;
using Quartz.Impl;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace JobScheduler
{

    public interface IEmailScheduleService
    {
        Task<string> RescheduleSendEmailAsync(RescheduleRequestModel requestModel);
    }

    public class EmailScheduleService : IEmailScheduleService
    {
        //An instance of Quartz.net generic Scheduler
        readonly IScheduler Scheduler;

        public EmailScheduleService()
        {
            // Grab the Scheduler instance from the Factory
            StdSchedulerFactory factory = new StdSchedulerFactory();
            var scheduler = factory.GetScheduler();

            // and start it off             
            Scheduler = scheduler.GetAwaiter().GetResult();

            Scheduler.Start();
        }

        public async Task<string> RescheduleSendEmailAsync(RescheduleRequestModel requestModel)
        {

            try
            {
                if (requestModel == null)
                {
                    return "Error, empty request ! .";
                }

                TimeZoneInfo cstZone = TimeZoneInfo.FindSystemTimeZoneById("Israel Standard Time");
                DateTime cstTime = TimeZoneInfo.ConvertTimeFromUtc(requestModel.RescheduleTime, cstZone);

                if (cstTime < DateTime.Now)
                {
                    return "Error, can't reschedule to the past ! .";
                }

                // Prepare the data for the job
                var data = new JobDataMap
            {
                { "EmailId", requestModel.MessageId },
                { "Message", requestModel.Message} ,
                { "Recipient", requestModel.Recipient},
                { "NumOfAttempts", requestModel.NumOfAttempts}
            };

                // Create a new job with the specified schedule
                IJobDetail job = JobBuilder.Create<SendEmailJob>()
                    .WithIdentity(Guid.NewGuid().ToString())
                    .SetJobData(data)
                    .Build();

                ITrigger trigger = TriggerBuilder.Create()
                   .WithIdentity(Guid.NewGuid().ToString())
                   .StartAt(cstTime)
                   //.StartAt(DateTime.Now.AddMinutes(1).ToUniversalTime()) //use this for easier testing, set by 1 minute   rescheduleDate
                   .Build();

                // Schedule the job with the trigger
                await Scheduler.ScheduleJob(job, trigger);

                return "Email job rescheduled successfully.";
            }
            catch (Exception ex)
            {
                return $"Error occurred while rescheduling the email job: {ex.Message}";
            }

        }
    }

    /// <summary>
    /// Gets the JobDetail from quartz, calls SendMail controller and if it fails re schedule the job again 
    /// </summary>
    public class SendEmailJob : IJob
    {
        public Task Execute(IJobExecutionContext context)
        {
            SendMailRequestModel requestModel = null;
            int numOfAttempts = 0;
            try
            {
                JobDataMap dataMap = context.JobDetail.JobDataMap;
                string emailId = dataMap.GetString("EmailId");
                string message = dataMap.GetString("Message");
                string recipient = dataMap.GetString("Recipient");
                numOfAttempts = dataMap.GetInt("NumOfAttempts");

                HttpClient _httpClient = new HttpClient();
                _httpClient.BaseAddress = new Uri("https://localhost:44375/api/Email/");

                requestModel = new SendMailRequestModel
                {
                    Message = message,
                    MessageId = emailId,
                    Recipient = recipient
                };

                // Serialize the request model to JSON
                var json = Newtonsoft.Json.JsonConvert.SerializeObject(requestModel);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var response = _httpClient.PostAsync("SendMail", content).GetAwaiter().GetResult();

                if (response.IsSuccessStatusCode)
                {
                    var responseContent = response.Content.ReadAsStringAsync();

                }
                else
                {
                    // Handle non-success status code
                    var errorMessage = response.Content.ReadAsStringAsync();

                    //logger - todo put the logger repository in separate project... 

                    ReScheduleFromJob(requestModel, numOfAttempts);
                }

                return Task.CompletedTask;
            }
            catch (Exception)
            {
                ReScheduleFromJob(requestModel, numOfAttempts);
                return Task.CompletedTask;
            }

        }

        /// <summary>
        /// To be used after failed attempt from job 
        /// </summary>
        /// <param name="requestModel"></param>
        /// <returns></returns>
        public Task ReScheduleFromJob(SendMailRequestModel requestModel, int numOfAttempts)
        {

            if (numOfAttempts > 3)
            {
                //log
                return Task.CompletedTask;
            }

            RescheduleRequestModel requestScheduleModel = new RescheduleRequestModel()
            {
                Message = requestModel.Message,
                MessageId = requestModel.MessageId,
                Recipient = requestModel.Recipient,
                RescheduleTime = DateTime.Now.ToUniversalTime().AddMinutes(1),
                NumOfAttempts = numOfAttempts + 1
            };

            HttpClient _httpClient = new HttpClient();
            _httpClient.BaseAddress = new Uri("https://localhost:44375/api/Email/");

            var json = Newtonsoft.Json.JsonConvert.SerializeObject(requestScheduleModel);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            // Call the API's SendMail action using HttpClient
            var response = _httpClient.PostAsync("RescheduleAction", content).GetAwaiter().GetResult();

            if (response.IsSuccessStatusCode)
            {
                var responseContent = response.Content.ReadAsStringAsync();
            }
            else
            {
                // Handle non-success status code
                var errorMessage = response.Content.ReadAsStringAsync();

                //logger - todo put the logger repository in separate project... 

                //maybe try again + limit the number of attempts  OR give up 
            }

            return Task.CompletedTask;
        }
    }

}
