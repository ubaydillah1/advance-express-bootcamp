import * as dataService from "../services/data.services.js";

// GET all data
export async function getAllData(req, res) {
  try {
    // Mengambil query params
    const filterCategoryId = req.query.filter; // Misalkan filter dikirim sebagai ?filter=1
    const sortField = req.query.sort; // Misalkan sort dikirim sebagai ?sort=title
    const search = req.query.search; // Misalkan search dikirim sebagai ?search=math

    // Memanggil service dengan parameter
    const data = await dataService.getAllData(
      filterCategoryId,
      sortField,
      search
    );

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// GET data by ID
export async function getDataById(req, res) {
  try {
    const data = await dataService.getDataById(req.params.id);
    if (data) {
      res.json(data);
    } else {
      res.status(404).send("Data not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// PATCH update data
export async function updateData(req, res) {
  try {
    await dataService.updateData(req.params.id, req.body);
    res.status(200).send("Data updated successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// DELETE data
export async function deleteData(req, res) {
  try {
    await dataService.deleteData(req.params.id);
    res.status(200).send("Data deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// POST insert data
export async function insertData(req, res) {
  try {
    await dataService.insertData(req.body);
    res.status(201).send("Data inserted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
}
