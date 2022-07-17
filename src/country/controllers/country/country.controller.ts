import { Controller, Get, Param, Query } from '@nestjs/common';
import { CountryService } from '../../../country/services/country/country.service';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  getUploadedCountries() {
    return this.countryService.countriesToDb();
  }

  @Get('all-country')
  getAllCountry(@Query('page') page: number) {
    return this.countryService.getAllCountry(page);
  }

  @Get('country-id/:id')
  getCountryId(@Param('id') id: number) {
    return this.countryService.findCountry(id);
  }
}
