import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Vector3 } from './common/common.types';
import * as fs from 'fs';

export class Vector3Data {

  items: Vector3[];

}

@Controller()
export class AppController {
  constructor() {}

  @Post('recording')
  getTestingData(@Body() items:Vector3Data) {

    this.newMethod(items,'data/recording/exercise.csv');

    return;
    //return this.appService.getHello();
  }

  private newMethod(items: Vector3Data, path:string) {
    let cadena = "";
    for (let i = 0; i < items.items.length; i++) {
      let vector3 = items.items[i];
      cadena += vector3.x + "," + vector3.y + "," + vector3.z + "\n";
    }
    fs.writeFileSync(path, cadena);
  }

  @Post('no-feedback')
  getTestingDataNoFeedback(@Body() items: Vector3Data){

    let dir = 'data/no-feedback';
    let files:string[] = fs.readdirSync(dir)
    let counter = files.length;
    

    this.newMethod(items,`${dir}/noFeedback_${counter+1}.csv`);
  }
}
