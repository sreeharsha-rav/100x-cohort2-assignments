import { client } from "..";

/*
 * Should insert into the users table
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function createUser(
  username: string,
  password: string,
  name: string
) {
  const query = `
  INSERT INTO users (username, password, name)
  VALUES ($1, $2, $3)
  RETURNING id, username, password, name
`;
  const values = [username, password, name];

  try {
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (err) {
    // Handle unique constraint violation or other errors
    throw new Error("Error creating user: " + err);
  }
}

/*
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function getUser(userId: number) {
  const query = `
        SELECT id, username, password, name
        FROM users
        WHERE id = $1
    `;

  try {
    const result = await client.query(query, [userId]);
    return result.rows[0] || null; // Return null if user not found
  } catch (err) {
    throw new Error("Error fetching user: " + err);
  }
}
