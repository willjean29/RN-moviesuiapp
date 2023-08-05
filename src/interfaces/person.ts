export interface ListCastApi {
  id: number;
  cast: CastApi[];
  crew: CastApi[];
}

export interface CastApi {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: Department;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: null | string;
  cast_id?: number;
  character?: string;
  credit_id: string;
  order?: number;
  department?: Department;
  job?: string;
  place_of_birth?: string;
  biography?: string;
  birthday?: string;
}

export interface ListCast {
  id: number;
  cast: Cast[];
  crew: Cast[];
}

export interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  knownForDepartment: Department;
  name: string;
  originalName: string;
  popularity: number;
  profilePath: null | string;
  castId?: number;
  character?: string;
  creditId: string;
  order?: number;
  department?: Department;
  job?: string;
  placeOfBirth?: string;
  biography?: string;
  birthday?: string;
}

export enum Department {
  Acting = 'Acting',
  Art = 'Art',
  Camera = 'Camera',
  CostumeMakeUp = 'Costume & Make-Up',
  Crew = 'Crew',
  Directing = 'Directing',
  Editing = 'Editing',
  Lighting = 'Lighting',
  Production = 'Production',
  Sound = 'Sound',
  VisualEffects = 'Visual Effects',
  Writing = 'Writing',
}
