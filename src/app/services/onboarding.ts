import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Onboarding {
  points=0;
progress=0;

missions=[
{
title:'Company Discovery',
description:'Learn about company values'
},
{
title:'HR Essentials',
description:'Read HR policies'
},
{
title:'Meet the Team',
description:'Explore your department'
},
{
title:'Role Training',
description:'Complete training modules'
}
];

completeMission(mission:any){

this.points +=100;

this.progress +=25;

alert("Mission Completed +100 XP 🎉");

}
}
