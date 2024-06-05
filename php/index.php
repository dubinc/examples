<?php
declare(strict_types=1);

require 'vendor/autoload.php';

use Dub\Models\Components;
use Dub\Models\Operations;

$security = new Components\Security();
$security->token = 'p4zAQVpvOBd8YQz5dUozZQiP';

$dub = Dub\Dub::builder()
  ->setWorkspaceId('ws_clrei1gld0002vs9mzn93p8ik')
  ->setSecurity("p4zAQVpvOBd8YQz5dUozZQiP")
  ->build();

try {
  $requestBody = new Operations\CreateLinkRequestBody();
  $requestBody->url = 'https://google/com';

  // Fix
  // This is not working
  $result = $dub->links->create($requestBody);
} catch (\Exception $e) {
  exit('Error: ' . $e->getMessage());
}

// Show the response of the sent email to be saved in a log...
echo $result->toJson();