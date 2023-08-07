import { ListCastApi, ListCast, CastApi, Cast } from '@interfaces/person';

export const getListPersonAdapter = (data: ListCastApi): ListCast => {
  return {
    id: data.id,
    cast: data.cast.map(cast => getPersonAdapter(cast)),
    crew: data.crew.map(crew => getPersonAdapter(crew)),
  };
};

export const getPersonAdapter = (cast: CastApi): Cast => {
  return {
    adult: cast.adult,
    gender: cast.gender,
    id: cast.id,
    knownForDepartment: cast.known_for_department,
    name: cast.name,
    originalName: cast.original_name,
    popularity: cast.popularity,
    profilePath: cast.profile_path,
    castId: cast.cast_id,
    character: cast.character,
    creditId: cast.credit_id,
    order: cast.order,
    department: cast.department,
    job: cast.job,
    placeOfBirth: cast.place_of_birth,
    biography: cast.biography,
    birthday: cast.birthday,
  };
};
