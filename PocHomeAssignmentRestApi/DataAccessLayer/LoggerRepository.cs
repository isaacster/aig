using Microsoft.EntityFrameworkCore;
using PocHomeAssignmentRestApi.DataAccessLayer;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

public interface ILoggerRepository
{
    Task<IEnumerable<LogTable>> GetLogs();
    Task<LogTable> GetLog(int id);
    Task AddLog(LogTable log);
    Task UpdateLog(LogTable log);
    Task DeleteLog(int id);
}

public class LoggerRepository : ILoggerRepository
{
    private readonly LoggerDbContext _dbContext;

    public LoggerRepository(LoggerDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<LogTable>> GetLogs()
    {
        return await _dbContext.LogTable.ToListAsync();
    }

    public async Task<LogTable> GetLog(int id)
    {
        return await _dbContext.LogTable.FindAsync(id);
    }

    public async Task AddLog(LogTable log)
    {
        try
        {
            _dbContext.LogTable.Add(log);
            await _dbContext.SaveChangesAsync();
        }
        catch (System.Exception)
        {

        }
    }

    public async Task UpdateLog(LogTable log)
    {
        _dbContext.Entry(log).State = EntityState.Modified;
        await _dbContext.SaveChangesAsync();
    }

    public async Task DeleteLog(int id)
    {
        var log = await _dbContext.LogTable.FindAsync(id);
        if (log != null)
        {
            _dbContext.LogTable.Remove(log);
            await _dbContext.SaveChangesAsync();
        }
    }
}
