import { getPool } from "@server/db";
import { logger } from "@server/logging";
import { Hedgehog, hedgehogSchema } from "@shared/hedgehog";
import { sql } from "slonik";

export async function getAllHedgehogs() {
  try {
    const hedgehogs = await getPool().any(
      sql.type(hedgehogSchema)`SELECT id FROM hedgehog`
    );

    return hedgehogs;
  } catch (error) {
    logger.error(error);
  }
}

// TODO: Yksittäisen siilin hakeminen tietokannasta ID:llä

// TODO: Yksittäisen siilin lisäämisen sovelluslogiikka
export async function addHedgehog(hedgehog: Hedgehog ) {
  try {
    await getPool().one(
      sql.type(hedgehogSchema)`
      INSERT INTO hedgehog VALUES (
        ${hedgehog.id}, ${hedgehog.name}, ${hedgehog.sex}, ${hedgehog.lat}, ${hedgehog.lon})`
    );
    console.log(hedgehog);
  } catch(error) {
    logger.error(error);
  }
  
}