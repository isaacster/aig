using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PocHomeAssignmentRestApi.DataAccessLayer
{
    public class User
    {
        public int ID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Role { get; set; }
    }

    public class LogTable
    {
        public int ID { get; set; }
        public string ActivityData { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
