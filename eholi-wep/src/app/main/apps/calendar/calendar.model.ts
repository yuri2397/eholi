export class EventRef {
  id? = undefined;
  url: string;
  title: string = '';
  start: string;
  end: string;
  classLevelId: string;
  allDay = false;
  courseId: string;

  professorId: string;
  isRepead = false;
  calendar: '';
  classRoomId: string;
  extendedProps = {
    location: '',
    description: '',
    addGuest: []
  };
}
