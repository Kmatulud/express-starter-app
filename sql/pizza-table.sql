create table pizza(
    id serial not null primary key,
    description text not null,
    size text not null,
    price decimal(10, 2)
);