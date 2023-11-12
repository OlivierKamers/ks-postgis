import { db } from "./database";

export const getTile = async (
  z: number,
  x: number,
  y: number
): Promise<Buffer> => {
  const query = db.raw(
    `
WITH bbox AS (
   SELECT ST_Extent(ST_TileEnvelope(:z,:x,:y)) as b2d,
   ST_TileEnvelope(:z,:x,:y) as geom
   ),
 mvtgeom AS (
   SELECT ST_AsMVTGeom(ST_Transform(nyc_census_blocks.geom, 3857), bbox.b2d) AS geom, popn_total
   FROM nyc_census_blocks, bbox
   WHERE ST_Intersects(ST_Transform(nyc_census_blocks.geom, 3857), bbox.geom)
)
 SELECT ST_AsMVT(mvtgeom.*,'nyc_census_blocks') FROM mvtgeom;
    `,
    { z, x, y }
  );
  // console.log(query.toQuery());
  const res = await query;
  return Buffer.from(res.rows[0].st_asmvt);
};
