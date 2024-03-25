import { addHedgehog, getAllHedgehogs, getHedgehogById } from "@server/application/hedgehog";
import { Hedgehog, hedgehogSchema } from "@ubigu/shared/src/hedgehog";
import { FastifyInstance, FastifyPluginOptions, FastifyRequest } from "fastify";

interface IGetHedgehogById { 
  hedgehogId: number,
}

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


  // TODO: Yksittäisen siilin hakeminen tietokannasta ID:llä
  // fastify.get(...);
  fastify.get("/:hedgehogId", async function (request : FastifyRequest< {Params: IGetHedgehogById}>, reply) {
    const { hedgehogId } = request.params;
    const response = await getHedgehogById(hedgehogId);
    console.log(response);
    return reply.code(200).send({
      response
    })

  })

  // TODO: Yksittäisen siilin lisäämisen sovelluslogiikka
  // fastify.post(...)
  fastify.post("/new", async function (request, reply) {
    const newHedgehog : Hedgehog = hedgehogSchema.parse(request.body);
    const response = await addHedgehog(newHedgehog);
    
    return reply.code(200).send({
      response
    })
  })

  done();
}
