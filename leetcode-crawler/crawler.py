import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import pandas as pd

# Initialize Selenium WebDriver
chrome_options = Options()
chrome_options.add_argument("--headless")  # Run in headless mode
chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument("--no-sandbox")

# Provide the correct path to the ChromeDriver executable
chrome_driver_path = '/Users/wangshu/Desktop/ETHz/Thesis/intuition-visualisation/chromedriver_mac_arm64/chromedriver'

# Start timer
start_time = time.time()

try:
    driver = webdriver.Chrome(executable_path=chrome_driver_path, options=chrome_options)

    # Base URL for LeetCode problems
    base_url = 'https://leetcode.com/problemset/all/'

    # List to store problem details
    problems_list = []

    # Function to get problem details
    def get_problem_details(problem_url):
        driver.get(problem_url)
        time.sleep(2)  # Wait for the page to load

        try:
            # Get problem title
            title = driver.find_element(By.CSS_SELECTOR, '.css-v3d350').text.strip()
        except Exception as e:
            title = None
            print(f"Error fetching title: {e}")

        try:
            # Get tags
            tags = [tag.text for tag in driver.find_elements(By.CSS_SELECTOR, '.topic-tag__1jni')]
        except Exception as e:
            tags = []
            print(f"Error fetching tags: {e}")

        return title, tags

    # Open the LeetCode problems page
    driver.get(base_url)
    time.sleep(5)  # Wait for the page to load

    # Scroll to the bottom of the page to load more problems
    for _ in range(20):  # Adjust this value to ensure enough problems are loaded
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(1)  # Wait for new problems to load

    # Find all problem links
    problem_links = driver.find_elements(By.CSS_SELECTOR, '.h-5 a')
    print('problem_links: ', problem_links, '\n')
    problem_urls = ['https://leetcode.com' + link.get_attribute('href') for link in problem_links]

    # Counter to limit to first 200 problems
    counter = 0

    # Iterate over problems and extract details
    for problem_url in problem_urls:
        print(problem_url, '/n')
        if counter >= 100:
            break

        # Get problem details
        title, tags = get_problem_details(problem_url)

        if title:
            # Append problem details to list
            problems_list.append({
                'Title': title,
                'Link': problem_url,
                'Tags': ', '.join(tags)
            })
            counter += 1

    # Create a DataFrame from the list
    df = pd.DataFrame(problems_list)

    # Check if the DataFrame is not empty
    if not df.empty:
        # Save DataFrame to CSV
        df.to_csv('leetcode_problems.csv', index=False)
        print('CSV file has been created successfully.')
    else:
        print('No problems found to write to CSV.')

except Exception as e:
    print(f"An error occurred: {e}")

finally:
    # Close the WebDriver
    driver.quit()

    # End timer
    end_time = time.time()
    elapsed_time = end_time - start_time
    print(f"Total time taken: {elapsed_time:.2f} seconds")
