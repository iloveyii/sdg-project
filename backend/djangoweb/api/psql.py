import psycopg2

connection = None

try:
    connection = psycopg2.connect(user="runner",
                                  host="127.0.0.1",
                                  port="5432",
                                  database="postgres")

    cursor = connection.cursor()
    # Print PostgresSQL Connection properties
    print(connection.get_dsn_parameters(), "\n")

    # Print PostgresSQL version
    cursor.execute("SELECT version();")
    record = cursor.fetchone()
    print("You are connected to - ", record, "\n")

except (Exception, psycopg2.Error) as error:
    print("Error while connecting to PostgresSQL", error)
finally:
    # closing database connection.
    if connection:
        cursor.close()
        connection.close()
        print("PostgresSQL connection is closed")
