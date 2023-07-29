using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Quartz;
using Quartz.Impl;
using Quartz.Spi;

namespace JobScheduler
{

    public class RescheduleRequestModel
    {
        public string MessageId { get; set; }

        public string Message { get; set; }

        public string Recipient { get; set; }

        public DateTime RescheduleTime { get; set; }

        /// <summary>
        /// to be used after re scheduling after fail 
        /// </summary>
        public int NumOfAttempts { get; set; }
    }

    public class SendMailRequestModel
    {
        public string MessageId { get; set; }

        public string Message { get; set; }

        public string Recipient { get; set; }
    }

}
