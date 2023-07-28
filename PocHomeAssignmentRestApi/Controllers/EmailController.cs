using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JobScheduler;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PocHomeAssignmentRestApi.Authentication;
using PocHomeAssignmentRestApi.DataAccessLayer;
using Quartz;

[ApiController]
[Route("api/[controller]")]
public class EmailController : ControllerBase
{
    private readonly ILoggerRepository _loggerRepository;

    private readonly IScheduleService _scheduler;

    

    //taking the logger repository for logging activity , and scheduling interface 
    public EmailController(IScheduleService scheduler, ILoggerRepository loggerRepository)
    {
        _loggerRepository = loggerRepository;
        _scheduler = scheduler;
    }


    // Custom POST: api/Email/RescheduleAction
    [HttpPost("RescheduleAction")] // Use a custom route for the custom action
    public async Task<IActionResult> RescheduleActionAsync([FromBody] RescheduleRequestModel requestModel)
    {
        try
        {



             await _scheduler.DoTaskAsync("Dfgdfg");


            return Ok("Jobs scheduled successfully!");
        }
        catch (Exception ex)
        {
            // Handle exceptions if needed
            return StatusCode(500, new { Error = "An error occurred during the custom action." });
        }
    }





    // GET: api/Email/5
    [HttpGet("{id}")]
    public ActionResult<LogTable> GetEmail(int id)
    {
        throw new NotImplementedException();
    }

    // POST: api/Email
    [HttpPost]
    public ActionResult<LogTable> AddEmail(LogTable log)
    {
        throw new NotImplementedException();
    }




    // PUT: api/Email/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateEmail(int id, LogTable log)
    {
        if (id != log.ID)
        {
            return BadRequest();
        }

        await _loggerRepository.UpdateLog(log);
        return NoContent();
    }

    // DELETE: api/Email/5
    [HttpDelete("{id}")]
    public IActionResult DeleteEmail(int id)
    {
        throw new NotImplementedException();
    }
}

public class RescheduleRequestModel
{

    public string MessageId { get; set; }

    public string RescheduleTime { get; set; }


}

