using CoronaApp.Services.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace CoronaApp.Services
{
    public interface IPatientRepository
    {
        Patient Get(int id);

        void Save(Patient patient);

        void Add(int id, Location location);

        void Delete(int id, Location location);
    }
}
