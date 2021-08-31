using System.Collections.Generic;
using System.Linq;
using AngularTest.Dto;

namespace AngularTest.Service
{
    public class UserStore
    {
        private readonly List<UserDto> _userDtos = new();
        public UserStore()
        {
            GenerateTestData();
        }
        
        public UserDto Add(UserDto user)
        {
            var maxId = _userDtos.Count == 0 ? 0 : _userDtos.Select(u => u.Id).Max();
            user.Id = maxId + 1;
            _userDtos.Add(user);
            return user;
        }

        public UserDto Get(int id)
        {
            return _userDtos.FirstOrDefault(u => u.Id == id);
        }

        public void Remove(int id)
        {
            _userDtos.RemoveAll(u => u.Id == id);
        }

        public UserDto Update(UserDto user)
        {
            var userDto = _userDtos.FirstOrDefault(u => u.Id == user.Id);
            if (userDto != null)
            {
                userDto.FirstName = user.FirstName;
                userDto.LastName = user.LastName;
                userDto.Email = user.Email;
                userDto.MobilePhone = user.MobilePhone;
                return userDto;
            }

            return null;
        }
        
        private void GenerateTestData()
        {
            for (var i = 0; i < 40; i++)
            {
                Add(new UserDto
                {
                    FirstName = Faker.Name.First(),
                    LastName = Faker.Name.Last(),
                    MobilePhone = $"{Faker.RandomNumber.Next(11111,99999)}-{Faker.RandomNumber.Next(111,999)}",
                    Email = Faker.Internet.Email(),
                });
            }
        }

        public Paged<UserDto> GetPaged(int page, int size)
        {
            return new Paged<UserDto>
            {
                Items = _userDtos.Skip((page-1)*size).Take(size).AsEnumerable(),
                Total = _userDtos.Count
            };
        }
    }
}