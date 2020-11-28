using Microsoft.EntityFrameworkCore;

namespace SQLServerApi.Models
{
    public class XtecDigitalContext: DbContext
    {
        public XtecDigitalContext()
        {
        }

        public XtecDigitalContext(DbContextOptions<XtecDigitalContext> options)
            : base(options)
        {
        }
    }
}
