
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PocHomeAssignmentRestApi.Authentication;
using PocHomeAssignmentRestApi.DataAccessLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
[ApiController]
[Route("api/[controller]")]
public class LoggerController : ControllerBase
{
    private readonly ILoggerRepository _loggerRepository;

    public LoggerController(ILoggerRepository loggerRepository)
    {
        _loggerRepository = loggerRepository;
    }

    // GET: api/Logger
    [HttpGet]
    public async Task<ActionResult<IEnumerable<LogTable>>> GetLogs()
    {
        var logs = await _loggerRepository.GetLogs();
        return Ok(logs);
    }

    // GET: api/Logger/5
    [HttpGet("{id}")]
    public async Task<ActionResult<LogTable>> GetLog(int id)
    {        
        var log = await _loggerRepository.GetLog(id);
        if (log == null)
        {
            return NotFound();
        }

        //this can be converted to Dynamic object if needed 
        //log.ActivityData

        return Ok(log);
    }

    // POST: api/Logger
    [HttpPost]
    public async Task<ActionResult<LogTable>> AddLog(LogTable log)
    {
        /* TEST CODE  */
       // log = new LogTable() { ActivityData = "itzik", Timestamp = DateTime.Now };
        
        await _loggerRepository.AddLog(log);
        return CreatedAtAction(nameof(GetLog), new { id = log.ID }, log);
    }

    // PUT: api/Logger/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateLog(int id, LogTable log)
    { 
        if (id != log.ID)
        {
            return BadRequest();
        }

        await _loggerRepository.UpdateLog(log);
        return NoContent();
    }

    // DELETE: api/Logger/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteLog(int id)
    {
        await _loggerRepository.DeleteLog(id);
        return NoContent();
    }
}

 