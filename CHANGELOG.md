# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


## [1.1.7] - 2020-12-07
### Added
- Add custom Media Types support in StudyPrefetcher - [@triet12369]

## [1.1.6] - 2020-10-19
### Added
- Add custom StudyInstanceUID to bulkData fetch - [@triet12369]

## [1.1.5] - 2020-10-19
### Fixed
- Fixed MetadataProvider for Overlay Plane Module - [@triet12369]
- Remove checks for non-image series in StudyMetadata -[@triet12369]
- Replace BulkDataURI with correct url in Overlay series [@triet12369]

## [1.1.4] - 2020-10-19
### Fixed
- Bind this to cache full callback in StudyPrefetcher - [@triet12369]

## [1.1.3] - 2020-10-17
### Fixed
- Add check for displaySet images in Study Prefetcher - [@triet12369]

## [1.1.2] - 2020-09-17
### Fixed
- Add special rules for PHILIPS and SIEMENS modality - [@triet12369]
### Changed
- Add b-value, ImageType to split rule - [@triet12369]


## [1.1.1] - 2020-08-07
### Added
- Add combinedId to OHIFSeriesMEtadata to account for subseries - [@triet12369]
### Changed
- Changed updateSeries and createDisplaySets to account for combinedId - [@triet12369]

## [1.1.0] - 2020-08-06
### Fixed
- Fix splitSeries does not return origin series when first load cause no image instance - [@tunglt1810]

## [1.0.9] - 2020-08-06
### Added
- Add series split functionality - [@triet12369]
- Add getters function in OHIFSeriesMetadata - [@triet12369]
## Changed
- Changed addSeries condition in OHIFStudyMetadata - [@triet12369]
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