using Quartz;
using Quartz.Impl;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace JobScheduler
{


    public interface IScheduleService
    {
            Task DoTaskAsync(string date);
    }

    public class ScheduleService : IScheduleService
    {

        IScheduler Scheduler;

        public ScheduleService()
        {

            // Grab the Scheduler instance from the Factory
            StdSchedulerFactory factory = new StdSchedulerFactory();
            var scheduler =   factory.GetScheduler();

            // and start it off
              
            Scheduler = scheduler.GetAwaiter().GetResult();

            Scheduler.Start();
        }

        public async Task DoTaskAsync(string date)
        {

            // Prepare the data for the job
            var data = new JobDataMap
        {
            { "EmailId", "fgfhfghfgh" },
            { "SendDateTime", DateTime.Now.AddDays(1) }
        };

            // Create a new job with the specified schedule
            IJobDetail job = JobBuilder.Create<SendEmailJob>()
                .WithIdentity(Guid.NewGuid().ToString())
                .SetJobData(data)
                .Build();

            // Create a trigger that will fire the job at the specified datetime
            ITrigger trigger = TriggerBuilder.Create()
                .WithIdentity(Guid.NewGuid().ToString())
                .StartAt(DateTime.Now.AddDays(1))
                .Build();

            // Schedule the job with the trigger
            await Scheduler.ScheduleJob(job, trigger);
        }
    }

    public class HelloJob : IJob
    {
        public async Task Execute(IJobExecutionContext context)
        {
            await Console.Out.WriteLineAsync("Greetings from HelloJob!");
        }
    }


}
