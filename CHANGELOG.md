# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## Unreleased
### Added
- Add combinedId to OHIFSeriesMEtadata to account for subseries - [@Triet]
### Changed
- Changed updateSeries and createDisplaySets to account for combinedId - [@Triet]

## [1.1.0] - 2020-08-06
### Fixed
- Fix splitSeries does not return origin series when first load cause no image instance - [@tunglt1810]

## [1.0.9] - 2020-08-06
### Added
- Add series split functionality - [@Triet]
- Add getters function in OHIFSeriesMetadata - [@Triet]
## Changed
- Changed addSeries condition in OHIFStudyMetadata - [@Triet]
- Merge change from origin to support maximum concurrent metadata request - [@tunglt1810]

## [1.0.8] - 2020-07-17
### Fixed
- Fixed packaged bundle version - [@tunglt1810]
- Fixed some eslint rules - [@tunglt1810]

## [1.0.7] - 2020-07-09
### Changed
- Change get authorization header by get directly value from getAccessToken function - [@tunglt1810]

## [1.0.6] - 2020-07-02
### Added
- MeasurementApi: now support options for store annotations - [@tunglt1810]

## [1.0.5] - 2020-06-25
### Added
- StudyMetadata: add warning log for invalid image data when creating display set - [@tunglt1810]
### Changed
- MeasurementApi: change logic update measurement after stored to storage - [@tunglt1810]

## [1.0.4] - 2020-06-20
### Removed
- Remove unused AnnotationService - [@tunglt1810]

## [1.0.3] - 2020-06-19
### Changed
- Add persist state for measurement remove handler - [@tunglt1810]