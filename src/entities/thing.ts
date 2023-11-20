export interface Thing {
  id: string;
  when: string;
  thing: string;
}

export interface ThingsResponse {
  things: Thing[];
}
