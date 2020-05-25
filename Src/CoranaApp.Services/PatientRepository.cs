using CoronaApp.Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CoronaApp.Services
{
    public class PatientRepository : IPatientRepository
    {
        public List<Patient> Patients;
        public PatientRepository()
        {
            Patients=new List<Patient>();
            Patients.Add(new Patient(123456789, new Location { City = "Jerusalem", LocationOfPerson = "Sanhedria" }));
        }

        public void Add(int id, Location location)
        {
            Patient p = Patients.FirstOrDefault(p => p.PatientId == id);
            if (p != null)
            {
                p.Path.Add(location);
            }
        }

        public void Delete(int id, Location location)
        {
            Patient p = Patients.FirstOrDefault(p => p.PatientId == id);
            if (p != null)
            {
                p.Path.Remove(location);
            }
        }

        public Patient Get(int id)
        {
            return Patients.FirstOrDefault(p => p.PatientId == id);
        }

        public void Save(Patient patient)
        {
            Patients.Add(patient);
        }
    }
}
