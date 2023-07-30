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

    private readonly IEmailScheduleService _scheduler;

    //taking the logger repository for logging activity , and scheduling interface 
    public EmailController(IEmailScheduleService scheduler, ILoggerRepository loggerRepository)
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
            _loggerRepository.AddLog(new LogTable() { ActivityData = "RescheduleActionAsync", Timestamp = DateTime.Now });

            string response = await _scheduler.RescheduleSendEmailAsync(requestModel);

            return Ok(response);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Error = "An error occurred during the custom action." });
        }
    }

    // Custom POST: api/Email/RescheduleAction
    [HttpPost("SendMail")] // Use a custom route for the custom action
    public async Task<IActionResult> SendMail([FromBody] SendMailRequestModel requestModel)
    {
        try
        {
            _loggerRepository.AddLog(new LogTable() { ActivityData = "SendMail from scheduler command: " + requestModel.MessageId, Timestamp = DateTime.Now });

            return Ok("Mail sent successfully!");
        }
        catch (Exception ex)
        {
            _loggerRepository.AddLog(new LogTable() { ActivityData = "SendMail failed , message id: " + requestModel.MessageId, Timestamp = DateTime.Now });

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

    /*
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

    */
}



