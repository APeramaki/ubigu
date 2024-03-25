import { getPool } from "@server/db";
import { logger } from "@server/logging";
import { Hedgehog, hedgehogSchema } from "@shared/hedgehog";
import { sql } from "slonik";

export async function getAllHedgehogs() {
  try {
    const hedgehogs = await getPool().query(
      sql.type(hedgehogSchema)`SELECT * FROM hedgehog`
    );

    return hedgehogs.rows;
  } catch (error) {
    logger.error(error);
  }
}

// TODO: Yksittäisen siilin hakeminen tietokannasta ID:llä
export async function getHedgehogById(id : number) {
  try {
    const response = await getPool().one(
      sql.type(hedgehogSchema)`
        SELECT * FROM hedgehog WHERE id = 12`
    );
    return response;
  } catch (error) {
    logger.error(error);
  }

}

// TODO: Yksittäisen siilin lisäämisen sovelluslogiikka
export async function addHedgehog(hedgehog: Hedgehog ) {
    
  try {
    const newHedgehog = await getPool().one(
      sql.type(hedgehogSchema)`
        INSERT INTO hedgehog (name, sex, location)
        VALUES (${hedgehog.name}, ${hedgehog.sex}, POINT(${hedgehog.point[0]}, ${hedgehog.point[1]}))
        RETURNING *`
    );
    return newHedgehog;
  } catch(error) {
    logger.error(error);
  }
  
}