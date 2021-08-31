using System.Collections.Generic;

namespace AngularTest.Dto
{
    public class Paged<T>
    {
        public IEnumerable<T> Items { get; set; }
        public int Total { get; set; }
    }
}