using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace SQLServerApi.Models
{
    public partial class XtecDigitalDBContext : DbContext
    {
        public XtecDigitalDBContext()
        {
        }

        public XtecDigitalDBContext(DbContextOptions<XtecDigitalDBContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
