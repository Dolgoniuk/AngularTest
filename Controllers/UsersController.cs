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
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Paged<UserDto>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Get([FromQuery] int page = 1, [FromQuery] int size = 10)
        {
            if (page < 1 || size < 1)
                return BadRequest();

            var result = _userStore.GetPaged(page, size);
            return Ok(result);
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