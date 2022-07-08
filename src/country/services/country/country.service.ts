import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AxiosResponse } from 'axios';
import { response } from 'express';
import { map, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { CountryEntity } from '../../../country/entities/country.entity';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(CountryEntity)
    private readonly countryRepo: Repository<CountryEntity>,
    private readonly httpService: HttpService,
  ) {}

  countriesToDb(): Observable<AxiosResponse<any>> {
    const getCountry = this.httpService
      .get('https://countriesnow.space/api/v0.1/countries/codes')
      .pipe(map((response) => response.data.data));

    const countries = [];

    getCountry.forEach((country) => {
      //   console.log(country);
      for (let i = 0; country.length > i; i++) {
        countries.push({
          country_code: country[i]['code'],
          country_name: country[i]['name'],
          short_code: country[i]['dial_code'],
        });
      }
      return this.countryRepo.save(countries);
    });
    return getCountry;
  }
  async getAllCountry(): Promise<CountryEntity[]> {
    const country = this.countryRepo.find();
    return country;
  }
}
