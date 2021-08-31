using System.Collections.Generic;
using AngularTest.Dto;
using AngularTest.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AngularTest.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly UserStore _userStore;

        public UsersController(UserStore userStore)
        {
            _userStore = userStore;
        }
        
        [HttpGet]
        public IEnumerable<UserDto> Get()
        {
            return _userStore.GetAll();
        }
        
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(UserDto))]
        public IActionResult Add(UserDto user)
        {
            var result = _userStore.Add(user);
            return Ok(result);
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(UserDto))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult Update(UserDto user)
        {
            var result = _userStore.Update(user);
            if (result == null)
            {
                return NotFound();
            }
            
            return Ok(result);
        }

        [HttpDelete("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(UserDto))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult Delete([FromQuery] int id)
        {
            var userDto = _userStore.Get(id);
            if (userDto == null)
            {
                return NotFound();
            }
            _userStore.Remove(id);
            return Ok(userDto);
        }
    }
}