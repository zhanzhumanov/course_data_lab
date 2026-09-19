/* 
	Реализовать функцию findUsersWithRole, которая принимает XML-документ xmlDoc и строку targetRole, которая представляет роль пользователя. Функция должна возвращать массив пользователей с заданной ролью.

	Пример XML:
<users>
  <user id="1">
    <profile>
      <personal>
        <roles>
          <role>admin</role>
          <role>user</role>
        </roles>
      </personal>
    </profile>
  </user>
  <user id="2">
    <profile>
      <personal>
        <roles>
          <role>user</role>
        </roles>
      </personal>
    </profile>
  </user>
</users>	
*/

export interface UserWithRole {
  id: string;
  profile: {
    personal: {
      roles: string[];
    };
  };
}

export function findUsersWithRole(
  xmlDoc: Document,
  targetRole: string
): Element[] {
  const users = xmlDoc.getElementsByTagName("user");
  const result: Element[] = [];

  for (const user of Array.from(users)) {
    const roles = user.getElementsByTagName("role");

    for (const role of Array.from(roles)) {
      if (role.textContent === targetRole) {
        result.push(user);
        break;
      }
    }
  }

  return result;
}
