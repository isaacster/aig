using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PocHomeAssignmentRestApi.DataAccessLayer
{
    public class Email
    {
        public string MessageId { get; set; }
        public string Timestamp { get; set; }
        public string Recipient { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }

    }
}
