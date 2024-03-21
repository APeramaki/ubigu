import { addHedgehog, getAllHedgehogs } from "@server/application/hedgehog";
import { Hedgehog, hedgehogSchema } from "@ubigu/shared/src/hedgehog";
import { FastifyInstance, FastifyPluginOptions } from "fastify";

export function hedgehogRouter(
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions,
  done: () => void
) {
  fastify.get("/", async function (_request, reply) {
    const hedgehogs = await getAllHedgehogs();

    return reply.code(200).send({
      hedgehogs,
    });
  });

  fastify.post("/new", async function (request, reply) {
    
    const data/*  : typeof hedgehogSchema  */= await request.body;
    console.log(request.body);
/*     const h = hedgehogSchema.parse({
      id: 0,
      name: "siiri",
      sex: "Male",
      lat: 1,
      lon: 2,
    }) */
    const h = addHedgehog(hedgehogSchema.parse(request.body));
    
    return reply.code(200).send({
      h
    })
  })
  // TODO: Yksittäisen siilin hakeminen tietokannasta ID:llä
  // fastify.get(...);

  // TODO: Yksittäisen siilin lisäämisen sovelluslogiikka
  // fastify.post(...)

  done();
}
