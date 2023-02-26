using Microsoft.EntityFrameworkCore;
using ToDoList.Models;

namespace ToDoList.Data;

public class ApplicationDbContext : DbContext
{
    //created a constructor - write some parameters
    //bcoz when we get the dbcontext we need to pass it on to the base class
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
        //here db context is configured
    }

    //create a Db set
    public DbSet<List> Lists { get; set; }
}
// we have to inherit this class file from the Db context
// that is inside Entity Framework core

// we have to add migrations in pm console to track all the db changes