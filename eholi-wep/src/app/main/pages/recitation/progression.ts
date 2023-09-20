import { Media } from "app/shared/models/media.model";

export interface ProgressionDetails {
    id:           string;
    first_name:   string;
    last_name:    string;
    birth_at:     Date;
    birth_in:     string;
    email:        null;
    telephone:    null;
    cni:          null;
    reference:    string;
    sexe:         string;
    adress:       string;
    status:       number;
    created_at:   Date;
    updated_at:   Date;
    departement:  null;
    media:        Media[];
    progressions: Progression[];

}

export interface Progression {
    id:                       string;
    student_id:               string;
    surah_id:                 string;
    progression:              number;
    created_at:               Date;
    updated_at:               Date;
    student_progression_items: StudentProgressionItem[];
    surah:                    Surah;
}

export interface StudentProgressionItem {
    id:                     string;
    student_progression_id: string;
    start_ayah_number:      number;
    end_ayah_number:        number;
    note:                   number;
    redo:                   number;
    created_at:             Date;
    updated_at:             Date;
}

export interface Surah {
    id:              string;
    number:          number;
    name:            string;
    tr_name:         string;
    revelation_type: string;
    ayahs: Ayah[];
    created_at:      Date;
    updated_at:      Date;
}

export interface Ayah {
    id:             string;
    number:         number;
    text:           string;
    number_inSurah: number;
    juz:            string;
    manzil:         string;
    page:           number;
    ruku:           string;
    hizb_quarter:   number;
    sajda:          number;
    surah_id:       string;
    created_at:     Date;
    updated_at:     Date;
}
