import { Controller, Get } from '@nestjs/common';
import { CountryService } from '../../../country/services/country/country.service';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  getUploadedCountries() {
    return this.countryService.countriesToDb();
  }

  @Get('all-country')
  getAllCountry() {
    return this.countryService.getAllCountry();
  }
}
