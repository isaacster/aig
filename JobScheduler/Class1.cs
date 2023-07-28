using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Quartz;
using Quartz.Impl;
using Quartz.Spi;

namespace JobScheduler
{

    public class SendEmailJob : IJob
    {
        public Task Execute(IJobExecutionContext context)
        {
            // Replace this with the actual logic to send the email
            // You can access the email ID and datetime from the JobDataMap
            JobDataMap dataMap = context.JobDetail.JobDataMap;
            string emailId = dataMap.GetString("EmailId");
            DateTime sendDateTime = dataMap.GetDateTime("SendDateTime");

            // Add your email sending logic here...

            return Task.CompletedTask;
        }
    }

    public class QuartzHostedService : IHostedService
    {
        private readonly IScheduler scheduler;

        public QuartzHostedService(IScheduler scheduler)
        {
            this.scheduler = scheduler;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            // You can add any existing email schedules here on application startup if needed.

            return Task.CompletedTask;
        }

        public async Task StopAsync(CancellationToken cancellationToken)
        {
            await scheduler.Shutdown();
        }
    }

    public class JobFactory : IJobFactory
    {
        private readonly IServiceProvider serviceProvider;

        public JobFactory(IServiceProvider serviceProvider)
        {
            this.serviceProvider = serviceProvider;
        }

        public IJob NewJob(TriggerFiredBundle bundle, IScheduler scheduler)
        {
            // Use the DI container to create an instance of the job class
            return serviceProvider.GetService(bundle.JobDetail.JobType) as IJob;
        }

        public void ReturnJob(IJob job)
        {
            // If necessary, perform any cleanup here.
        }
    }


}
