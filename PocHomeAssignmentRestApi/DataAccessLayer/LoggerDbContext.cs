 
using Microsoft.EntityFrameworkCore;
using PocHomeAssignmentRestApi.DataAccessLayer;

public class LoggerDbContext : DbContext
{
    public LoggerDbContext(DbContextOptions<LoggerDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<LogTable> LogTable { get; set; }

    // Add other DbSet properties for other tables, if needed

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        
    }
}
