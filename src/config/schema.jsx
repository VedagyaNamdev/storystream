import { integer, json, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const StoryData=pgTable('storyData',{
    id:serial('id').primaryKey(),
    genre:varchar('genre'),
    age:integer('age'),
    characters:varchar('characters'),
    startingPoint:text('startingPoint'),
    plotPoints:text('plotPoints'),
    output:json('output')
})