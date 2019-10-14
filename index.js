const Pool = require("pg").Pool;
const pool = new Pool({
  user: "user",
  host: "localhost",
  database: "db",
  password: "pass",
  port: 5432
});
const express = require("express");
const app = express();
const router = express.Router()
app.listen(3090, () => console.log("listening on port 3090"));
app.use(express.json());

//HTML pages
app.get("/", (req, res) => res.sendFile(`${__dirname}/index.html`));
 app.get("/songs", (req, res) => res.sendFile(`${__dirname}/songs.html`));

 //Musician api and functions
 const addNewMusician = async name => {
  try {
    const data = await pool.query("INSERT INTO Musician(Name) VALUES($1);", [
      name
    ]);
    return data.rows;
  } catch (e) {
    throw e;
  }
};

const editMusician = async (id, newValue) => {
  try {
    const data = await pool.query(
      `UPDATE Musician SET Name = $1 WHERE Musian_id = $2`,
      [newValue, id]
    );
    return data.rows;
  } catch (e) {
    throw e;
  }
};

const selectAllMusician = async () => {
  try {
    const data = await pool.query("SELECT * FROM Musician");
    return data.rows;
  } catch (e) {
    throw e;
  }
};
selectAllMusician()
const deleteMusician = async (musian_id) => {
  try {
    const data = await pool.query("DELETE FROM Musician WHERE musian_id = $1", [
      musian_id
    ]);
    return `Number of musician deleted: ${data.rowCount}`;
  } catch (e) {
    return "There was an error found could not delete";
  }
};



const sortMusicians = async () => {
  try {
    const data = await pool.query("SELECT * FROM Musician ORDER BY Name ASC");
    return data.rows;
  } catch (e) {
    return [];
  }
};



app.get("/playList", async (req, res) => {
  try {
    const data = await selectAllMusician();
    res.setHeader("content-type", "application/json");
    res.send(data);
  } catch (e) {
    res.send(e);
  }
});


app.get("/sort", async (req, res) => {
  try {
    const data = await sortMusicians();
    res.setHeader("content-type", "application/json");
    res.send(data);
  } catch (e) {
    res.send(e);
  }
});

app.post("/playList", async (req, res) => {
  let data = {};
  try {
    const requested = req.body;
    await addNewMusician(requested.name);
    data.success = true;
  } catch (e) {
    data.success = false;
  } finally {
    res.setHeader("content-type", "application/json");
    res.send(data);
  }
});

app.put("/playList", async (req, res) => {
  let data = {};
  try {
    const requested = req.body;
    await editMusician(requested.musian_id, requested.name);
    data.success = true;
  } catch (e) {
    data.success = false;
  } finally {
    res.setHeader("content-type", "application/json");
    res.send(data);
  }
});
app.delete("/playList", async (req, res) => {
  let data = {};
  try {
    const requested = req.body;
    await deleteMusician(requested.musian_id);
    data.success = true;
  } catch (e) {
    data.success = false;
  } finally {
    res.setHeader("content-type", "application/json");
    res.send(data);
  }
});

//songs api and functions

const addSong = async (id,song) => {
  try{
      const result = await pool.query("INSERT INTO songs (musician_id,song_name) VALUES ($1,$2);", [id,song]);
      return result.rows
      

  }catch(e){
      return e
  }
}
 
const deleteSong = async (id) =>{
  try{
      const result =  await pool.query("DELETE FROM songs WHERE song_id = $1",[id])
      return result.rows

  }catch(e){
      return e
  }
}

const listSongs = async (id) => {
  try {
    const data = await pool.query("SELECT song_id,song_name FROM songs WHERE musician_id = $1",[id]);
    return data.rows;
  } catch (e) {
    throw e;
  }
};

app.get("/songs/:id", async (req,res) => {
   
  try {
    const requested = req.params;

    const data = await listSongs(requested.id);
    res.setHeader("content-type", "application/json");
    res.send(data);
   
  } catch (e) {
  res.redirect("/songs")
  }
})

app.post("/songs/:id/:name", async (req, res) => {
  let data = {};
  try {
    const requested = req.params;
    await addSong(requested.id,requested.name);
    data.success = true;
  } catch (e) {
    data.success = false;
  } finally {
    res.setHeader("content-type", "application/json");
    res.redirect("/songs");
  }
});


app.delete("/songs", async (req, res) => {
  let data = {};
  try {
    const requested = req.body;
    await deleteSong(requested.song_id);
    data.success = true;
  } catch (e) {
    data.success = false;
  } finally {
    res.setHeader("content-type", "application/json");
    res.send(data);
  }
});


module.exports = router;

  