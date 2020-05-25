using System.Collections.Generic;

namespace CoronaApp.Services.Models
{
    public class Patient
    {
        public int PatientId { get; set; }
        public List<Location> Path { get; set; }

        public Patient(int id)
        {
            PatientId = id;
            Path = new List<Location>();
        }
        public Patient(int id, Location location): this(id)
        {
            Path.Add(location);
        }
    }

}
