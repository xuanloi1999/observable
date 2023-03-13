import './style.css';

import {
  of,
  map,
  Observable,
  from,
  fromEvent,
  interval,
  timer,
  merge,
  delay,
  reduce,
  toArray,
  buffer,
  scan,
  BehaviorSubject,
} from 'rxjs';

const observer = {
  next: (val) => console.log(val),
  error: (err) => console.log(err),
  complete: () => console.log('complete'),
};

const users = [
  {
    id: 'ddfe3653-1569-4f2f-b57f-bf9bae542662',
    username: 'tiepphan',
    firstname: 'tiep',
    lastname: 'phan',
    postCount: 5,
  },
  {
    id: '34784716-019b-4868-86cd-02287e49c2d3',
    username: 'nartc',
    firstname: 'chau',
    lastname: 'tran',
    postCount: 22,
  },
];

const usersVm = users.map((user) => {
  return {
    ...user,
    fullname: `${user.firstname} ${user.lastname}`,
  };
});

merge(of(users));

//complete befor run pipable

//Like reduce method of array
const totalCount = merge(
  of(users[0]).pipe(delay(1000)),
  of(users[1]).pipe(delay(2000))
);

totalCount.pipe(reduce((acc, cur) => acc + cur.postCount, 0));

//ToArray : if u want all emit data convert to Array
const totalCount2 = merge(
  of(users[0]).pipe(delay(1000)),
  of(users[1]).pipe(delay(1000))
).pipe(toArray());

//buffer run when have flag
const sourse = interval(1000);
const clicks = fromEvent(document, 'click');

sourse.pipe(buffer(clicks)).subscribe(observer);

//scan
totalCount.pipe(scan((acc, cur) => acc + cur.postCount, 0));

//Cretae simple state management

const initalState = {};

const stateSubject = new BehaviorSubject(initalState);

const state$ = stateSubject
  .asObservable()
  .pipe(scan((state, partialState) => ({ ...state, ...partialState }), {}));

state$.subscribe(observer);

stateSubject.next({ name: 'Loi' });
stateSubject.next({ age: 'Loi' });
// Open the console in the bottom right to see results.
