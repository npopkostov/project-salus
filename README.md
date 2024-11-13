# Ministry of Internal Affairs Event Scraper

## Overview
I have created a scraper in **Node.js** using **Puppeteer** to process all events from the Ministry of Internal Affairs’ daily bulletins, available at [mvr.gov.mk/dnevni-bilteni](https://mvr.gov.mk/dnevni-bilteni), starting from February 28, 2015, the date of the first bulletin ever published by the Ministry. 

As of now, the scraper has processed over **73,000 events**, achieving:
- **99.3% accuracy** in determining the location where the event occurred.
- Identifying the type of crime or event in over **82.3% of cases**.

## How It Works
Each event is analyzed, and its details are compared against a structured database using a hierarchical search process:  

1. **Region Identification**:  
   The scraper identifies the region where the event occurred, based on one of Macedonia's **eight Internal Affairs departments**. Each department contains multiple:
   - Police departments
   - Police stations
   - Border crossings
   - Other points of interest

2. **Detailed Location Search**:  
   After identifying the region, the scraper searches within that region’s database to narrow down the location. It determines whether the event took place in a specific:
   - City
   - Municipality
   - Neighborhood
   - Village
   - Street  

   When a match is found, the **coordinates** of the location are added to the event’s final object.

3. **Confidence Score Calculation**:  
   A **confidence score** is generated based on the level of detail in the match:
   - A **street-level match** results in a higher confidence score due to greater precision.
   - A **city- or neighborhood-level match** results in a lower confidence score.  

   The average confidence score across all **73,127 events processed** is **67.3%**.

   > _Example:_  
   An event description such as:
   > *"Лицето Ј.П (35) пријавило дека во петокот во Населба Кисела Вода било нападнато"*  
   Does not specify the exact location within Kisela Voda. In such cases, the confidence score ranges between **50-60%**, indicating an approximate radius of uncertainty (e.g., Kisela Voda has a radius of ~1,000-1,500 meters from its center).  

4. **Event Type Identification**:  
   The scraper analyzes the event to identify the **type of crime or incident** that occurred.

## Planned Updates
A planned update will include fetching **historical weather data** for the date and location of each event. This feature is expected to enable statistical analyses, such as evaluating correlations between weather conditions (e.g., low visibility due to fog or snow) and the incidence of car accidents or other events.

## Future Potential
This project not only processes and categorizes historical data but also lays the groundwork for:
- **Advanced analytics and insights**
- Predictive modeling
- Spatial analysis of public safety trends

Stay tuned for further updates!
