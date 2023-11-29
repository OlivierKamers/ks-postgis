CREATE INDEX nyc_census_blocks_geom_idx
    ON nyc_census_blocks
        USING GIST (geom);