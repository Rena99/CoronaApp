using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CoronaApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        // GET: api/<LocationController>
        [HttpGet]
        public IEnumerable<string> Get([FromQuery] Services.Models.LocationSearch locationSearch)
        {
            return new string[] { "value1", "value2" };
        }

     

      
    }
}
