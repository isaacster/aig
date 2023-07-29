using Quartz;
using Quartz.Impl;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace JobScheduler
{


    public interface IEmailScheduleService
    {
        Task RescheduleSendEmailAsync(string emailMessageId, string emailMessage, DateTime rescheduleDate);
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

        public async Task RescheduleSendEmailAsync(string emailMessageId, string emailMessage, DateTime rescheduleDate)
        {
            TimeZoneInfo cstZone = TimeZoneInfo.FindSystemTimeZoneById("Israel Standard Time");
            DateTime cstTime = TimeZoneInfo.ConvertTimeFromUtc(rescheduleDate, cstZone);


            // Prepare the data for the job
            var data = new JobDataMap
            {
                { "EmailId", emailMessageId },
                { "Message", "pleaseholder"} //take from db by email id or send from js as well, doesn't matter to me 
            };

            // Create a new job with the specified schedule
            IJobDetail job = JobBuilder.Create<SendEmailJob>()
                .WithIdentity(Guid.NewGuid().ToString())
                .SetJobData(data)
                .Build();

            // Create a trigger that will fire the job at the specified datetime
            //ITrigger trigger = TriggerBuilder.Create()
            //    .WithIdentity(Guid.NewGuid().ToString())
            //    .StartAt(DateTime.Now.AddDays(1))
            //    .Build();


            ITrigger trigger = TriggerBuilder.Create()
               .WithIdentity(Guid.NewGuid().ToString())
               .StartAt(rescheduleDate)
               //.StartAt(DateTime.Now.AddMinutes(1).ToUniversalTime()) //use this for easier testing, set by 1 minute   rescheduleDate
               .Build();

            // Schedule the job with the trigger
            await Scheduler.ScheduleJob(job, trigger);
        }
    }

    public class SendEmailJob : IJob
    {
        public Task Execute(IJobExecutionContext context)
        {
            // Replace this with the actual logic to send the email
            // You can access the email ID and datetime from the JobDataMap
            JobDataMap dataMap = context.JobDetail.JobDataMap;
            string emailId = dataMap.GetString("EmailId");
            DateTime sendDateTime = dataMap.GetDateTime("Message");

            // Add your email sending logic here...

            return Task.CompletedTask;
        }
    }

    //public class HelloJob : IJob
    //{
    //    public async Task Execute(IJobExecutionContext context)
    //    {
    //        await Console.Out.WriteLineAsync("Greetings from HelloJob!");
    //    }
    //}


}
