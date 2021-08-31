using System.Collections.Generic;
using System.Linq;
using AngularTest.Dto;

namespace AngularTest.Service
{
    public class UserStore
    {
        private List<UserDto> _userDtos = new()
        {
            new()
            {
                Id = 1,
                Email = "some@email.com",
                FirstName = "Petr",
                LastName = "Petrov",
                MobilePhone = "55555555"
            },
            new()
            {
                Id = 2,
                Email = "other@email.com",
                FirstName = "Ivan",
                LastName = "Ivanov",
                MobilePhone = "33333333"
            },
            new()
            {
                Id = 3,
                Email = "new@email.com",
                FirstName = "Sidor",
                LastName = "Sidorov",
                MobilePhone = "11111111"
            }
        };

        public UserDto Add(UserDto user)
        {
            var maxId = _userDtos.Select(u => u.Id).Max();
            user.Id = maxId + 1;
            _userDtos.Add(user);
            return user;
        }
        
        public IEnumerable<UserDto> GetAll()
        {
            return _userDtos.AsEnumerable();
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
    }
}