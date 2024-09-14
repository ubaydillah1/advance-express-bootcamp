import db from "../db.js";

// SELECT All Data
export async function getAllData() {
  const [rows] = await db.query("SELECT * FROM class");
  return rows;
}

// SELECT by ID
export async function getDataById(id) {
  const [rows] = await db.query("SELECT * FROM class WHERE id = ?", [id]);
  return rows[0];
}

// UPDATE Data
export async function updateData(id, data) {
  const { image, title, description, price, tutor_id, category_id } = data;
  await db.query(
    "UPDATE class SET image = ?, title = ?, description = ?, price = ?, tutor_id = ?, category_id = ? WHERE id = ?",
    [image, title, description, price, tutor_id, category_id, id]
  );
}

// DELETE Data
export async function deleteData(id) {
  await db.query("DELETE FROM class WHERE id = ?", [id]);
}

// INSERT Data
export async function insertData(data) {
  const { image, title, description, price, tutor_id, category_id } = data;
  await db.query(
    "INSERT INTO class (image, title, description, price, tutor_id, category_id) VALUES (?, ?, ?, ?, ?, ?)",
    [image, title, description, price, tutor_id, category_id]
  );
}
